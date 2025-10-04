'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import apiClient from '@/lib/axios';

// Define the structure for Role and User
interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  employee_number: string;
  date_of_joining: string;
  role: string;
  role_id: number;
  status: string;
}

interface UserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUserSaved: () => void; // More generic name: onUserSaved
  userToEdit?: User | null; // Optional prop for editing
}

export function UserForm({ isOpen, onClose, onUserSaved, userToEdit }: UserFormProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [roleId, setRoleId] = useState('');
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isEditMode = Boolean(userToEdit);

  // Effect to pre-fill the form when in edit mode
  useEffect(() => {
    if (isEditMode && userToEdit) {
      const [fName, ...lNameParts] = userToEdit.name.split(' ');
      setFirstName(fName);
      setLastName(lNameParts.join(' '));
      setEmail(userToEdit.email);
      setEmployeeNumber(userToEdit.employee_number);
      setDateOfJoining(userToEdit.date_of_joining);
      setRoleId(String(userToEdit.role_id));
    } else {
      // Reset form when opening for "create"
      setFirstName('');
      setLastName('');
      setEmail('');
      setEmployeeNumber('');
      setDateOfJoining('');
      setRoleId('');
    }
  }, [userToEdit, isEditMode]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get('/admin/roles');
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch roles", error);
        toast({ variant: 'destructive', title: "Failed to load roles" });
      }
    };
    if (isOpen) { // Fetch roles only when the dialog is open
      fetchRoles();
    }
  }, [isOpen, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      email,
      firstName,
      lastName,
      dateOfJoining,
      role_id: parseInt(roleId, 10),
    };

    try {
      if (isEditMode) {
        await apiClient.put(`/admin/users/${userToEdit?.id}`, payload);
        toast({ title: "User Updated", description: `${firstName} ${lastName}'s details have been saved.` });
      } else {
        await apiClient.post('/employees/create', { ...payload, employeeNumber });
        toast({ title: "User Created", description: `An email has been sent to ${email}.` });
      }
      onUserSaved();
      onClose();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: `Failed to ${isEditMode ? 'Update' : 'Create'} User`,
        description: error.response?.data?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit User' : 'Create New User'}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Update the user's details below." : "A temporary password will be sent to their email."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">First Name</Label>
              <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">Last Name</Label>
              <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" value={email} className="col-span-3" onChange={(e) => setEmail(e.target.value)} required disabled={isEditMode} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employeeNumber" className="text-right">Employee No.</Label>
              <Input 
                id="employeeNumber" 
                value={isEditMode ? employeeNumber : "Auto-Generated"} 
                className="col-span-3" 
                disabled 
                readOnly 
            />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateOfJoining" className="text-right">Joining Date</Label>
              <Input id="dateOfJoining" type="date" value={dateOfJoining} onChange={(e) => setDateOfJoining(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Role</Label>
              <Select onValueChange={setRoleId} value={roleId} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}