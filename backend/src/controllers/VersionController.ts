import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const index = async (req: Request, res: Response): Promise<Response> => {
  // Lê a versão diretamente do package.json para garantir que está sempre atualizada
  try {
    const packageJsonPath = path.join(__dirname, "..", "..", "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    return res.status(200).json({
      version: packageJson.version
    });
  } catch (error) {
    // Fallback para variável de ambiente
    return res.status(200).json({
      version: process.env.npm_package_version || "7.0.0"
    });
  }
};
