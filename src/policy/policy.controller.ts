import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PolicyService } from "./policy.service";
import { CreatePolicyDto } from "./dto/create-policy.dto";
import { UpdatePolicyDto } from "./dto/update-policy.dto";
import { Public } from "src/auth/auth.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("policy")
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policyService.create(createPolicyDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.policyService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.policyService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policyService.update(+id, updatePolicyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.policyService.remove(+id);
  }
}
