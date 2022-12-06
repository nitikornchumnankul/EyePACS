import { EntityRepository, Repository } from "typeorm";
import { EyePhotos } from "./eye-photos.entity";

@EntityRepository(EyePhotos)
export class EyePhotosRepository extends Repository<EyePhotos> {}