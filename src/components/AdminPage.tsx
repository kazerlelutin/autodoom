import { AdminTokenForm } from './AdminTokenForm'
import { ModeratorCreateForm } from './Moderators/ModeratorCreateForm'
import { ModeratorList } from './Moderators/ModeratorList'
import { ModeratorsProvider } from './Moderators/Moderators'
import { ModeratorsReloadButton } from './Moderators/ModeratorsReloadBtn'

export default function AdminPage() {
  return (
    <ModeratorsProvider>
      <div className="grid grid-rows-[auto_auto_1fr] gap-2 h-full">
        <div className="flex gap-2 justify-between">
          <AdminTokenForm />
          <ModeratorsReloadButton />
        </div>
        <ModeratorCreateForm />

        <div className="relative h-full">
          <div className="absolute top-0 right-0 left-0 bottom-0 overflow-y-auto">
            <ModeratorList />
          </div>
        </div>
      </div>
    </ModeratorsProvider>
  )
}
