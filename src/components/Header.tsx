import { ModeToggle } from "./ModeToggle"

export function Header() {
  return (
    <div className=" max-w-full border-b-[0.5px] h-14">
      <div className="flex items-center justify-between h-full px-4">
        <ModeToggle />
      </div>
    </div>
  )
}
