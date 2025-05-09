const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-6 container'>
      <div className='flex w-full max-w-md flex-col gap-6'>{children}</div>
    </div>
  );
};

export default AuthLayout;
