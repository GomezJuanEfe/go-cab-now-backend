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
    let uploadingFile = false
    let countFiles = 0

    const bb = busboy({headers: req.headers});
    req.body = {};

    const done = () => {
    if(uploadingFile) return
    if(countFiles > 0) return

    next()
  }

    // Capturar las partes que no son archivos y los guardo en req.body
    bb.on('field', (key, val) => {
      req.body[key] = val;
    });
    
    
    // Capturar las partes que sí son archivos
    bb.on('file',(key, stream) => {
      uploadingFile = true
      countFiles++
      const cloud = cloudinary.uploader.upload_stream(
        { upload_preset: preset },
        (err, res) => {
          if (err) throw err;

          req.body[key] = res?.secure_url;
          uploadingFile = false
          countFiles--
          done();
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
        done();
      });
      
      req.pipe(bb);
    } 
  }
