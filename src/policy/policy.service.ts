import { Injectable } from "@nestjs/common";
import { CreatePolicyDto } from "./dto/create-policy.dto";
import { UpdatePolicyDto } from "./dto/update-policy.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Policy } from "./entities/policy.entity";
import { Repository } from "typeorm";

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>
  ) {}

  create(createPolicyDto: CreatePolicyDto) {
    return this.policyRepository.save(createPolicyDto);
  }

  findAll() {
    return this.policyRepository.find();
  }

  findOne(id: number) {
    return this.policyRepository.findOneBy({ id });
  }

  findPolicy(roleId: number, resId: number): Promise<Policy | undefined> {
    return this.policyRepository.findOneBy({
      roleId: roleId,
      resourceId: resId,
    });
  }

  update(id: number, updatePolicyDto: UpdatePolicyDto) {
    return this.policyRepository.update(id, updatePolicyDto);
  }

  remove(id: number) {
    return this.policyRepository.delete(id);
  }
}
