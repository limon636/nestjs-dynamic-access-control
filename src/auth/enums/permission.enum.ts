import Create from "./create.permission.enum";
import Read from "./read.permission.enum";

const permissions = { ...Read, ...Create}
enum Permission {
     Read, Create
}

export default Permission;