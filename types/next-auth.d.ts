import { DefaultSession } from "next-auth"
import { AdapterUser as BaseAdapterUser } from "@auth/core/adapters"

declare module "next-auth" {
  /**
   * session.user 타입을 확장하여 role과 isAdmin을 추가합니다.
   */
  interface Session {
    user: {
          id: string;
        role: string;
        isAdmin: boolean;
    } & DefaultSession["user"]
  }

  /**
   * User 타입을 확장합니다.
   */
  interface User {
    role?: string;
  }
}

declare module "@auth/core/adapters" {
  /**
   * 어댑터에서 사용하는 유저 타입을 확장합니다.
   * role을 선택적(optional) 속성으로 정의하여 내부 생성 로직과의 충돌을 방지합니다.
   */
  interface AdapterUser extends BaseAdapterUser {
    role?: string;
  }
}