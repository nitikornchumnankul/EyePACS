import { EntityRepository, Repository } from "typeorm";
import { Table8 } from "./table-8.entity";

@EntityRepository(Table8)
export class Table8Repository extends Repository<Table8> {}