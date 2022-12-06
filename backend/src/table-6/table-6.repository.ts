import { EntityRepository, Repository } from "typeorm";
import { Table6 } from "./table-6.entity";

@EntityRepository(Table6)
export class Table6Repository extends Repository<Table6> {}