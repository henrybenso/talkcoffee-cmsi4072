import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function formSection() {
  <FormField
    control={form.control}
    name="instagramHandle"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Instagram Handle</FormLabel>
        <FormControl>
          <Input placeholder="@" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />;
}
