import { EntityRepository, Repository } from "typeorm";
import { Table15 } from "./entities/table-15.entity";

@EntityRepository(Table15)
export class Table15Repository extends Repository<Table15> {}