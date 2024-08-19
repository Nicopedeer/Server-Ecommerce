import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryConfig } from "src/config/cloudinary";
import { Products } from "src/entities/Products.entity";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryRepository } from "./cloudinary.repository";


@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    controllers: [CloudinaryController],
    providers: [
      CloudinaryService,
      CloudinaryConfig,
      CloudinaryRepository
    ]
  })
  export class CloudinaryModule {}