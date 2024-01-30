/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Y33qYCJJdp0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="grid h-screen grid-cols-[300px_1fr]">
      <div className="border-r bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col h-full gap-4 py-2">
          <div className="px-4">
            <h2 className="text-2xl font-bold">Contacts</h2>
          </div>
          <nav className="flex-1 overflow-auto px-4">
            <Button asChild className="justify-start gap-2" size="sm" variant="ghost">
              <Link href="#">
                <Avatar>
                  <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                John Doe
              </Link>
            </Button>
            <Button asChild className="justify-start gap-2" size="sm" variant="ghost">
              <Link href="#">
                <Avatar>
                  <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                Jane Doe
              </Link>
            </Button>
          </nav>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-start gap-4 mb-4">
            <Avatar>
              <AvatarImage alt="@johndoe" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Oct 08, 2023 9:15 AM</div>
              <div className="mt-1 text-sm">Hello, how are you?</div>
            </div>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <Avatar>
              <AvatarImage alt="@janedoe" src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">Jane Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Oct 08, 2023 9:16 AM</div>
              <div className="mt-1 text-sm">I'm good, thanks! How about you?</div>
            </div>
          </div>
        </div>
        <div className="border-t bg-gray-100 dark:bg-gray-800 p-4">
          <div className="flex items-center gap-4">
            <Input className="flex-1" placeholder="Type your message here..." />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

