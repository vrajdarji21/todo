"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";
import Toast from "@/components/ui/Toast";
import {
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  Shield,
  User,
  Users,
} from "lucide-react";

// Mock Data
const initialUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Team Lead",
    status: "Active",
    teamSize: 4,
    department: "Engineering",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@company.com",
    role: "Employee",
    status: "Active",
    assignedTL: "Sarah Johnson",
    projects: 2,
    department: "Frontend",
  },
  {
    id: 3,
    name: "Alice Smith",
    email: "alice@company.com",
    role: "Employee",
    status: "Inactive",
    assignedTL: "Sarah Johnson",
    projects: 0,
    department: "Backend",
  },
  {
    id: 4,
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Team Lead",
    status: "Active",
    teamSize: 2,
    department: "Design",
  },
];

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("leadership"); // 'leadership' or 'employees'

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  // Load Data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          try {
            setUsers(JSON.parse(storedUsers));
          } catch (error) {
            setUsers(initialUsers);
          }
        } else {
          setUsers(initialUsers);
          localStorage.setItem("users", JSON.stringify(initialUsers));
        }
        setIsLoaded(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredUsers = users.filter((user) => {
    // 1. Tab Logic
    const isLeadership = user.role === "Admin" || user.role === "Team Lead";
    if (activeTab === "leadership" && !isLeadership) return false;
    if (activeTab === "employees" && isLeadership) return false;

    // 2. Search
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    // 3. Status
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    // 4. Role (Specific drill down)
    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setToast({ message: "User deleted successfully", type: "success" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <div
          className={`transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <Sidebar
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <main
          className="flex-1 min-h-screen transition-all duration-300"
          style={{
            marginTop: "56px",
            width: sidebarOpen ? "calc(100% - 256px)" : "calc(100% - 64px)",
          }}
        >
          <div className="p-6 w-full space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Team Management
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage team members, roles, and access
                </p>
              </div>
              <Link href="/team/new">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">
                  <Plus className="h-4 w-4" />
                  Add Team Member
                </button>
              </Link>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("leadership")}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "leadership"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Admin / Team Leads
                </button>
                <button
                  onClick={() => setActiveTab("employees")}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === "employees"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Employees
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-card border border-border rounded-xl p-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Role Filter */}
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="All">All Roles</option>
                    {activeTab === "leadership" ? (
                      <>
                        <option value="Admin">Admin</option>
                        <option value="Team Lead">Team Lead</option>
                      </>
                    ) : (
                      <option value="Employee">Employee</option>
                    )}
                  </select>
                </div>

                {/* Department Filter */}
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option value="All">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-foreground">
                        User Details
                      </th>
                      <th className="px-6 py-4 font-semibold text-foreground">
                        Role
                      </th>
                      <th className="px-6 py-4 font-semibold text-foreground">
                        Department
                      </th>
                      {/* Dynamic Columns based on Tab */}
                      {activeTab === "leadership" ? (
                        <th className="px-6 py-4 font-semibold text-foreground">
                          Team Size
                        </th>
                      ) : (
                        <>
                          <th className="px-6 py-4 font-semibold text-foreground">
                            Assigned TL
                          </th>
                          <th className="px-6 py-4 font-semibold text-foreground">
                            Projects
                          </th>
                        </>
                      )}
                      <th className="px-6 py-4 font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {!isLoaded ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center">
                          Loading team members...
                        </td>
                      </tr>
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-4 text-center text-muted-foreground"
                        >
                          No team members found.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">
                                  {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                              {user.role === "Admin" && (
                                <Shield className="h-3 w-3" />
                              )}
                              {user.role === "Team Lead" && (
                                <Users className="h-3 w-3" />
                              )}
                              {user.role === "Employee" && (
                                <User className="h-3 w-3" />
                              )}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {user.department}
                          </td>

                          {/* Conditional Columns */}
                          {activeTab === "leadership" ? (
                            <td className="px-6 py-4 text-muted-foreground">
                              {user.teamSize || 0} Members
                            </td>
                          ) : (
                            <>
                              <td className="px-6 py-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                                    {user.assignedTL
                                      ? user.assignedTL.charAt(0)
                                      : "?"}
                                  </div>
                                  <span>{user.assignedTL || "Unassigned"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">
                                {user.projects || 0} Active
                              </td>
                            </>
                          )}

                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === "Active"
                                  ? "bg-green-500/10 text-green-600"
                                  : "bg-red-500/10 text-red-600"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end items-center gap-2">
                              {/* Edit Button */}
                              <Link href={`/team/${user.id}/edit`}>
                                <button
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                              </Link>

                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
