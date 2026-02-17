import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export interface Grave {
  id: string;
  repo: string;
  description: string;
  tech: string;
  time: string;
  cause: string;
  lesson: string;
  createdAt: string;
}

export interface CreateGraveInput {
  repo: string;
  description: string;
  tech: string;
  time: string;
  cause: string;
  lesson: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "graves.json");

let cache: Grave[] | null = null;
let writeQueue = Promise.resolve();

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function loadGraves() {
  if (cache) {
    return cache;
  }

  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  cache = JSON.parse(raw) as Grave[];
  return cache;
}

async function persistGraves(graves: Grave[]) {
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(DATA_FILE, JSON.stringify(graves, null, 2), "utf-8");
  });

  await writeQueue;
}

export async function getAllGraves() {
  const graves = await loadGraves();
  return [...graves].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getGraveById(id: string) {
  const graves = await loadGraves();
  return graves.find((grave) => grave.id === id) ?? null;
}

export function validateGraveInput(input: unknown): CreateGraveInput {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid payload");
  }

  const data = input as Record<string, unknown>;

  const grave: CreateGraveInput = {
    repo: String(data.repo ?? "").trim(),
    description: String(data.description ?? "").trim(),
    tech: String(data.tech ?? "").trim(),
    time: String(data.time ?? "").trim(),
    cause: String(data.cause ?? "").trim(),
    lesson: String(data.lesson ?? "").trim(),
  };

  if (!grave.repo) {
    throw new Error("Repository name is required");
  }

  if (!grave.lesson) {
    throw new Error("Final lesson is required");
  }

  if (grave.repo.length > 120 || grave.description.length > 2000 || grave.tech.length > 300 || grave.lesson.length > 2000) {
    throw new Error("One or more fields exceed the maximum allowed length");
  }

  return grave;
}

export async function createGrave(input: CreateGraveInput) {
  const graves = await loadGraves();

  const newGrave: Grave = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };

  graves.unshift(newGrave);
  cache = graves;
  await persistGraves(graves);

  return newGrave;
}
