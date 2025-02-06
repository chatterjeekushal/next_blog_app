
import 'next-auth'
import { DefaultSession } from 'next-auth'
// Removed unused import for Loader2 to resolve the unused variable error

declare module 'next-auth' {
  interface User {
    _id?: string;
    isverified?: boolean;
    isactive?: boolean;
    username?: string;
    userImage?: string;
  }

  interface Session {
    user: {
      _id?: string;
      isverified?: boolean;
      isactive?: boolean;
      username?: string;
      userImage?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    isverified?: boolean;
    isactive?: boolean;
    username?: string;
    userImage?: string;
  }
}

declare module 'lucide-react' {
  import * as React from 'react';
  const content: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export = content;
}
