import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";

@Controller('files')
export class CloudinaryController {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) {} 
    @ApiBearerAuth()
    @ApiTags('Carga de archivos')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@Param ('id', ParseUUIDPipe) id: string,
    @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: 'El archivo es muy pesado',
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp|gif|svg)/,
                })
            ]
        })
    ) file: Express.Multer.File){
        return await this.cloudinaryService.uploadImage(id,file)
    }
}