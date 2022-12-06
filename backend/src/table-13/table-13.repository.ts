import { EntityRepository, Repository } from "typeorm";
import { Table13 } from "./table-13.entity";

@EntityRepository(Table13)
export class Table13Repository extends Repository<Table13> {}