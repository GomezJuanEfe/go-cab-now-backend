import busboy from "busboy";
import { v2 as cloudinary } from "cloudinary";
import { Response, Request, NextFunction } from "express";
import { AuthRequest } from "../auth/auth.types";

// Settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
export const formData = (preset: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const bb = busboy({headers: req.headers});
    req.body = {};
    
    // Capturar las partes que no son archivos y los guardo en req.body
    bb.on('field', (key, val) => {
      req.body[key] = val;
    });
    
    
    // Capturar las partes que sí son archivos
    bb.on('file',(key, stream) => {
      const cloud = cloudinary.uploader.upload_stream(
        { upload_preset: preset },
        (err, res) => {
          if (err) console.log(err);
          
          req.body[key] = res?.secure_url;
          next();
        }
        );
        
        stream.on('data', (data) => {
          cloud.write(data);
        });
        
        stream.on('end', () => {
          cloud.end();
        });
      });
      
      bb.on('finish', () => {
        next()
      });
      
      req.pipe(bb);
    } 
  }
      