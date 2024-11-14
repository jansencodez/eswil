const RegistrationSuccess: React.FC<{ name: string; studentId: string }> = ({
  name,
  studentId,
}) => (
  <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 mt-4">
    <h3 className="font-bold text-lg">Registration Successful!</h3>
    <p>
      Welcome, {name}! Your student ID is <strong>{studentId}</strong>. You can
      use this ID to sign in.
    </p>
  </div>
);

export default RegistrationSuccess;
