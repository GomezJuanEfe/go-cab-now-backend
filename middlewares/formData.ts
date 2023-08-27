import busboy from "busboy";
import {v2 as cloudinary} from 'cloudinary';
import { Request, Response, NextFunction  } from "express";

//Settings
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

//Milldeware

export const formData = (req: Request, res: Response, next: NextFunction) => {
    
    const bb = busboy({ headers: req.headers });
    req.body = {};
 
}
// Capturar las partes que no son archivos
 bb.on('field', (key, val) => {
    req.body[key] = val;
  })

// Capturar las partes que son archivos
  bb.on('file', (key, stream) => {

  }
