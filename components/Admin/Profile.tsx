import { inferMutationInput, trpc } from "@/lib/trpc";
import { Block, Button, List, ListInput } from "konsta/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { UserModel } from "@/lib/zod";

export default function AdminProfile() {
  const { data: user } = trpc.useQuery(["user.me"]);
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(UserModel)
  });
  return user ? (
    <div className="grid grid-cols-12">
      <Block
        className="col-span-12 lg:col-span-7 flex flex-col lg:flex-row gap-4 rounded-md"
        strong
        nested
      >
        <div className="w-full lg:w-4/12 flex flex-col items-center gap-4">
          <Image
            src={user.image}
            width={240}
            height={240}
            className="rounded-md"
          />
          <Button>Change Photo</Button>
        </div>
        <List nested className="w-full lg:w-8/12">
          <ListInput
            name="username"
            type="text"
            label="Username"
            value={user.username}
            readOnly
          />
          <Controller
            control={control}
            name="name"
            defaultValue={user.name}
            render={({ field, fieldState }) => (
              <ListInput
                type="text"
                label="Name"
                error={fieldState.error?.message || null}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            defaultValue={user.email}
            render={({ field, fieldState }) => (
              <ListInput
                type="email"
                label="Email"
                error={fieldState.error?.message || null}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            defaultValue={user.phone || 0}
            render={({ field, fieldState }) => (
              <ListInput
                type="number"
                label="Phone Number"
                error={fieldState.error?.message || null}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="brithDate"
            defaultValue={user.brithDate || ""}
            render={({ field, fieldState }) => (
              <ListInput
                type="datetime-local"
                label="Brith Date"
                error={fieldState.error?.message || null}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            defaultValue={user.gender}
            render={({ field, fieldState }) => (
              <ListInput
                label="Gender"
                type="select"
                name={field.name}
                dropdown
                defaultValue={"Male"}
                placeholder="Please choose..."
                error={fieldState.error?.message || null}
              >
                <option defaultValue="Male">Male</option>
                <option defaultValue="Female">Female</option>
              </ListInput>
            )}
          />

          <Button
            className="mt-8"
            onClick={handleSubmit((data) => {
              console.log(data);
            })}
          >
            Save Changes
          </Button>
        </List>
      </Block>
    </div>
  ) : (
    <div>Loading</div>
  );
}
