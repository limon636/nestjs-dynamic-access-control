import { Injectable } from "@nestjs/common";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Resource } from "./entities/resource.entity";
import { Repository } from "typeorm";

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>
  ) {}

  create(createResourceDto: CreateResourceDto) {
    return this.resourceRepository.save(createResourceDto);
  }

  findAll() {
    return this.resourceRepository.find();
  }

  findOne(id: number) {
    return this.resourceRepository.findOneBy({ id });
  }

  findResource(policy) {
    return this.resourceRepository.findOneBy(policy);
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return this.resourceRepository.update(id, updateResourceDto);
  }

  remove(id: number) {
    return this.resourceRepository.delete(id);
  }
}
