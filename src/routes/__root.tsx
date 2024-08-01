import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ColorModeButton } from '../components/layout/toolbar/color-mode-button';
import { BackButton } from '../components/layout/toolbar/back-button';

export const Route = createRootRoute({
  component: () => (
    <div className="px-4 lg:px-12 xl:px-24 2xl:px-36">
      <div className="w-full justify-between py-2 flex">
        <BackButton />
        <ColorModeButton />
      </div>
      <Outlet />
    </div>
  )
});
