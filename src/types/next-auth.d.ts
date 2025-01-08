
import 'next-auth'
import { DefaultSession } from 'next-auth';
import { Loader2 } from 'lucide-react'


declare module 'next-auth' {

    interface User {

        _id?:string;
        isverified?:boolean;
        isactive?:boolean;
        username?:string;
        userImage?:string;
    }

    interface Session {
        user:{
            _id?:string;
            isverified?:boolean;
            isactive?:boolean;
            username?:string;
            userImage?:string;
        } & DefaultSession['user']
    }

}


declare module 'next-auth/jwt' {

    interface JWT {

        _id?:string;
        isverified?:boolean;
        isactive?:boolean;
        username?:string;
        userImage?:string;
    }
}


declare module 'lucide-react' {
    const content: any;
    export = content;
  }