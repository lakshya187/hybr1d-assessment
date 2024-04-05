import { RequestHandler } from "express";

export interface Service {
  execute: RequestHandler;
}
