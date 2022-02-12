import { trpc } from "@/lib/trpc";
import { Block, Button, List, ListInput } from "konsta/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { z } from "zod";
import { ChangeEvent } from "react";
import { UserModel } from "@/lib/zod";
import moment from "moment";
import { ToastPosition, ToastType, useToast } from "@/lib/hooks/useToast";

const inputSchema = UserModel.pick({
  email: true,
  username: true,
  phone: true,
  gender: true
}).extend({
  name: z.string().min(3).max(100),
  brithDate: z.string().transform((c) => new Date(c))
});

export default function AdminProfile() {
  const { data: user, ...userQuery } = trpc.useQuery(["user.me"]);
  const update = trpc.useMutation(["user.profile.update"]);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(inputSchema)
  });
  const toast = useToast();
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
          <Controller
            control={control}
            name="username"
            defaultValue={user.username}
            render={({ field, fieldState }) => (
              <ListInput
                type="text"
                label="Username"
                error={fieldState.error?.message || null}
                {...field}
                readOnly
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
                readOnly
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            defaultValue={user.name || ""}
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
            name="phone"
            defaultValue={user.phone || ""}
            render={({ field, fieldState }) => (
              <ListInput
                type="text"
                label="Phone Number"
                error={fieldState.error?.message || null}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="brithDate"
            defaultValue={moment(user.brithDate || undefined).format(
              "yyyy-MM-DD"
            )}
            render={({ field, fieldState }) => (
              <ListInput
                type="date"
                label="Brith Date"
                error={fieldState.error?.message || null}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            defaultValue={user.gender || ""}
            render={({ field, fieldState }) => (
              <ListInput
                label="Gender"
                type="select"
                name={field.name}
                dropdown
                defaultValue={"Male"}
                placeholder="Please choose..."
                error={fieldState.error?.message || null}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e.target.value);
                }}
              >
                <option defaultValue="Male">Male</option>
                <option defaultValue="Female">Female</option>
              </ListInput>
            )}
          />

          <Button
            className="mt-8"
            onClick={handleSubmit((data: any) => {
              update
                .mutateAsync(data)
                .then((d) => {
                  toast.message(
                    {
                      title: "Successful Update",
                      message: "All Data Updated :D",
                      type: ToastType.SUCCESS
                    },
                    ToastPosition.TOP_CENTER
                  );
                })
                .catch((e) => {
                  toast.message(
                    {
                      title: "Failed Update",
                      message: e.message,
                      type: ToastType.ERROR
                    },
                    ToastPosition.TOP_CENTER
                  );
                })
                .finally(() => {
                  userQuery.refetch();
                });
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
