import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserRole } from '../../features/authSlice';
import { toast } from 'react-toastify';
import { HiOutlineUser, HiOutlineShieldCheck, HiArrowUp, HiArrowDown } from 'react-icons/hi';

const UserManagement = () => {
  const { users, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleRoleToggle = (user) => {
    // Guard against self demotion
    if (user.id === currentUser.id) {
      toast.warning('Self-demotion is disabled to prevent admin lockouts.');
      return;
    }

    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      dispatch(updateUserRole({ userId: user.id, newRole }));
      toast.success(`Role for "${user.username}" successfully updated to ${newRole.toUpperCase()}.`);
    } catch (err) {
      toast.error('Failed to update user role.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">User Accounts</h1>
        <p className="text-slate-400 text-xs mt-1">View registered customer credentials and manage administrator authorization privileges.</p>
      </div>

      {/* Users Table */}
      <div className="glass-panel border border-slate-850 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 font-bold uppercase">
                <th className="px-5 py-4">Account ID</th>
                <th className="px-5 py-4">Username</th>
                <th className="px-5 py-4">Email Address</th>
                <th className="px-5 py-4">Active Role</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {users.map((u) => {
                const isSelf = u.id === currentUser?.id;
                
                return (
                  <tr key={u.id} className="hover:bg-slate-900/30 transition-colors text-slate-350">
                    <td className="px-5 py-4 font-mono text-[10px] text-slate-500">{u.id}</td>
                    <td className="px-5 py-4 font-semibold text-slate-200">
                      <div className="flex items-center space-x-2">
                        <span>{u.username}</span>
                        {isSelf && (
                          <span className="bg-brand-500/10 text-brand-400 border border-brand-500/20 text-[9px] px-2 py-0.5 rounded font-bold uppercase">You</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] border ${
                        u.role === 'admin'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {u.role === 'admin' ? <HiOutlineShieldCheck /> : <HiOutlineUser />}
                        <span>{u.role}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleRoleToggle(u)}
                        disabled={isSelf}
                        className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border text-[11px] font-bold cursor-pointer transition-all ${
                          isSelf
                            ? 'bg-slate-900 border-slate-850 text-slate-650 cursor-not-allowed opacity-40'
                            : u.role === 'admin'
                              ? 'bg-slate-900 border-slate-800 text-amber-500 hover:text-amber-400 hover:border-amber-500/20'
                              : 'bg-slate-900 border-slate-800 text-purple-400 hover:text-purple-300 hover:border-purple-500/20'
                        }`}
                      >
                        {u.role === 'admin' ? (
                          <>
                            <HiArrowDown />
                            <span>Demote to User</span>
                          </>
                        ) : (
                          <>
                            <HiArrowUp />
                            <span>Promote to Admin</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
