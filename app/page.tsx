'use client';

import Swal from 'sweetalert2';
import { config } from './config';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter username and password',
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = { username, password };
      const res = await axios.post(`${config.apiUrl}/api/user/signin`, payload);

      const token = res.data?.token as string | undefined;
      if (token) {
        localStorage.setItem(config.tokenKey, token);
        router.push('/dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sign in failed',
          text: 'No token returned from server.',
        });
      }
    } catch (err: unknown) {
      let message = 'Unknown error';
      if (axios.isAxiosError(err)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message =
          (err.response?.data as { message?: string })?.message ||
          err.message ||
          'Network or server error';
      } else if (err instanceof Error) {
        message = err.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-950">
    {/* ลายพื้นหลังนุ่ม ๆ */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
    </div>

    <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 p-6 md:grid-cols-2 md:p-10">
      {/* LEFT: Welcome */}
      <section className="flex flex-col justify-center">
        <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white md:text-6xl">
          ยินดีต้อนรับ
        </h1>
        <p className="mb-8 max-w-md text-gray-300">
          เข้าสู่ระบบเพื่อเริ่มใช้งานแดชบอร์ดของคุณ
          จัดการข้อมูลได้อย่างง่ายและปลอดภัย
        </p>

        <div className="flex flex-col gap-3 text-gray-300">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20">
              🔒
            </span>
            <span>การยืนยันตัวตนที่ปลอดภัยด้วยโทเค็น</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20">
              ⚡
            </span>
            <span>โหลดเร็ว ใช้งานลื่นไหล</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20">
              📊
            </span>
            <span>แดชบอร์ดข้อมูลพร้อมใช้งาน</span>
          </div>
        </div>
      </section>

      {/* RIGHT: Login Card */}
      <section className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-gray-800/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur">
          <h2 className="mb-6 text-2xl font-bold text-white">เข้าสู่ระบบ</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-sm text-gray-300" htmlFor="username">
              <i className="fa-solid fa-user mr-2 text-white" />
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
              required
            />

            <label className="mt-2 text-sm text-gray-300" htmlFor="password">
              <i className="fa-solid fa-lock mr-2 text-white" />
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />

            <button
              type="submit"
              className="btn mt-6 disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
);


  // return (
  //   <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-8">
  //     <h1 className='mb-6 text-6xl font-bold text-white'>ยินดีต้อนรับ </h1>
  //     <div className="w-full max-w-md rounded-2xl bg-gray-800 p-8 shadow-2xl">
  //       <h1 className="mb-6 text-2xl font-bold text-white">เข้าสู่ระบบ</h1>

  //       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
  //         <label className="text-sm text-gray-300" htmlFor="username">
  //           <i className="fa-solid fa-user mr-2 text-white" />
  //           Username
  //         </label>
  //         <input
  //           id="username"
  //           type="text"
  //           className="form-control"
  //           value={username}
  //           onChange={(e) => setUsername(e.target.value)}
  //           placeholder="Username"
  //           autoComplete="username"
  //           required
  //         />

  //         <label className="mt-2 text-sm text-gray-300" htmlFor="password">
  //           <i className="fa-solid fa-lock mr-2 text-white" />
  //           Password
  //         </label>
  //         <input
  //           id="password"
  //           type="password"
  //           className="form-control"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           placeholder="Password"
  //           autoComplete="current-password"
  //           required
  //         />

  //         <button
  //           type="submit"
  //           className="btn mt-6 disabled:opacity-60"
  //           disabled={submitting}
  //         >
  //           {submitting ? 'Signing in...' : 'Sign in'}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
}
