import zod from 'zod';
const CreateTodo = zod.object({
    title:zod.string().min(2).max(100),
    description:zod.string().min(2).max(400),
    status:zod.boolean(),
})
const UpdateTodo = zod.object({
    id:zod.string(),
    status:zod.boolean(),
})
const DeleteTodo = zod.object({
    id:zod.string(),
})
export {CreateTodo,UpdateTodo,DeleteTodo}
