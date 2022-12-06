import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { SearchEyePhotosDto } from './dto/search-eye-photos.dto';
import { UpdateEyePhotoDto } from './dto/update-eye-photo.dto';
import { UpdateEyeStatusDto } from './dto/update-eye-status.dto';
import { UpdateEyeSideDto } from './dto/update-eyeside.dto';
import { EyePhotos } from './eye-photos.entity';
import { EyePhotosService } from './eye-photos.service';

@Controller('eye-photos')
export class EyePhotosController {
    constructor(private eyePhotosService: EyePhotosService) {}

    @UseGuards(JwtAuthGuard)
    @Post('uploads')
    @UseInterceptors(FilesInterceptor('images'))
    uploadEyePhotos(
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<EyePhotos[]> {
        return this.eyePhotosService.uploadEyePhotos(files)
    }

    @Get()
    getEyePhotos(
        @Query() searchEyePhotosDto: SearchEyePhotosDto
    ): Promise<EyePhotos[]> {
        return this.eyePhotosService.getEyePhotos(searchEyePhotosDto)
    }

    @Get(':eye_photo_id')
    getEyePhotoById(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<EyePhotos> {
        return this.eyePhotosService.getEyePhotoById(eye_photo_id)
    }

    @Get('image/:eye_photo_id')
    getEyePhotoImage(
        @Param('eye_photo_id') eye_photo_id: string,
        @Res() res,
    ){
        return res.sendFile(eye_photo_id, { root: 'uploads/eye-photos' })
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update/eyeside')
    updateEyeSide(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateEyeSideDto: UpdateEyeSideDto,
    ): Promise<EyePhotos> {
        return this.eyePhotosService.updateEyeSide(eye_photo_id, updateEyeSideDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update/status')
    updateEyeStatus(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateEyeStatusDto: UpdateEyeStatusDto,
    ): Promise<EyePhotos> {
        return this.eyePhotosService.updateEyeStatus(eye_photo_id, updateEyeStatusDto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update/eyephoto-comments')
    updateEyePhotoComments(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateEyePhotoDto: UpdateEyePhotoDto,
    ): Promise<EyePhotos> {
        return this.eyePhotosService.updateEyePhotoComments(eye_photo_id, updateEyePhotoDto)
    }
    @UseGuards(JwtAuthGuard)
    @Patch(':eye_photo_id/update/eyephoto-remarks')
    updateEyePhotoRemarks(
        @Param('eye_photo_id') eye_photo_id: string,
        @Body() updateEyePhotoDto: UpdateEyePhotoDto,
    ): Promise<EyePhotos> {
        return this.eyePhotosService.updateEyePhotoRemarks(eye_photo_id, updateEyePhotoDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':eye_photo_id/delete')
    deleteEyePhoto(
        @Param('eye_photo_id') eye_photo_id: string
    ): Promise<EyePhotos> {
        return this.eyePhotosService.deleteEyePhoto(eye_photo_id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-all')
    deleteEyePhotoAll(): Promise<string> {
        return this.eyePhotosService.deleteEyePhotoAll()
    }
}
