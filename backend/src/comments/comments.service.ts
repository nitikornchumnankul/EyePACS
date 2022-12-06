import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EyePhotosService } from 'src/eye-photos/eye-photos.service';
import { Comments } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsRepository)
        private commentsRepostiory: CommentsRepository,
        private eyePhotosService: EyePhotosService,
    ) {}

    async createComment(eye_photo_id: string, createCommentDto: CreateCommentDto): Promise<Comments> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const { description } = createCommentDto

            if(!description) {
                return null
            }

            const comment = this.commentsRepostiory.create({
                description,
                eye_photo,
            })
            return await this.commentsRepostiory.save(comment)
        } catch(e) {
            throw new BadRequestException({
                message: 'Error, comment can\'t be created.'
            })
        }
    }

    async updateComment(eye_photo_id: string, editCommentDto: EditCommentDto): Promise<Comments> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const comment = await this.commentsRepostiory.findOne({ where: { eye_photo } })
            const { description } = editCommentDto

            if(description) {
                comment.description = description
            }

            return await this.commentsRepostiory.save(comment)
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, comment is not found.'
            })
        }
    }

    async getComment(eye_photo_id: string): Promise<Comments> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const comment = await this.commentsRepostiory.findOne({ where: { eye_photo } })
            return comment
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, comment is not found.'
            })
        }
    }

    async deleteComment(eye_photo_id: string): Promise<string> {
        try {
            const eye_photo = await this.eyePhotosService.getEyePhotoById(eye_photo_id)
            const comment = await this.commentsRepostiory.findOne({ where: { eye_photo } })
            if(!comment) {
                return "success"
            }
            await this.commentsRepostiory.delete(comment.comment_id)
            return "success"
        } catch(e) {
            throw new NotFoundException({
                message: 'Error, comment is not found.'
            })
        }
    }
}
