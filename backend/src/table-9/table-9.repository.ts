import { EntityRepository, Repository } from "typeorm";
import { Table9 } from "./table-9.entity";

@EntityRepository(Table9)
export class Table9Repository extends Repository<Table9> {}