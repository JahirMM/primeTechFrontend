import { cookies } from 'next/headers';

export default async function Page() {
  const requestCookies = await cookies();
  const jwt = requestCookies.get('jwt');
  
  if (!jwt) {
    console.log('NO HAY JWT');
  } else {
    console.log('SI HAY JWT');
    console.log(jwt.value);
  }

  return <div>Perfil del usuario</div>;
}
