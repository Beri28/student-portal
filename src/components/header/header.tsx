import React, { useState } from 'react';
import { Avatar, Box, Button, Chip, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import { Logout, Menu, Person } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const {user,isAuthenticated,logout}=useAuth()
  const [menu,setMenu]=useState<boolean>(false)
  const navigate=useNavigate()
  return (
    <header className="bg-[#1b7dd0] text-white">
      <div className="sm:max-w-[90%] max-w-[95%] mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-inherit p-2 rounded-lg">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h1 className="sm:text-2xl text-xl  font-heading font-bold  text-ellipsis">Student Results Portal</h1>
            </div>
          </div>
          <IconButton sx={{display:{sm:'none'}}}>
            <Menu className='text-white ' />
          </IconButton>
          <div className="hidden md:flex items-center space-x-16">
            <div className="flex items-center space-x-6">
              <a href="#" className=" hover:text-accent font-medium">Support</a>
              <a href="#" className=" hover:text-accent font-medium">FAQs</a>
            </div>
            {isAuthenticated? 
            <div className='relative' >
              <IconButton onClick={()=>{setMenu(!menu)}}>
                <Chip avatar={<Person className='bg-transparent text-[black!important]' />} label={user?.name.slice(0,user?.name.indexOf(' '))} className='text-white bg-[#eff6ff!important] px-[.75em!important]' size='medium' />
              </IconButton>
              {menu && (
                <Box sx={{position:'absolute',right:'.55em',top:"2.2em",zIndex:10,mt:1,width:180,borderRadius:'8px',py:2,px:3,color:'black'}} className='bg-blue-50'>
                  <Stack spacing={1}>
                    {isAuthenticated &&
                      <Typography sx={{display:'flex',alignItems:'center',columnGap:'.45em',color:'black'}}>
                          <Avatar sx={{width:30,height:30,fontSize:''}} >{user?.name[0]}</Avatar>{user?.name}
                      </Typography>
                    }
                    <Divider />
                    <MenuItem sx={{color:'black'}} onClick={()=>{
                      setMenu(false)
                      navigate('/')
                    }} >Home</MenuItem>
                    <Divider />
                    {isAuthenticated &&
                      <Button variant='outlined' color='inherit' sx={{display:{sm:'flex',xs:'none'},color:'black'}} onClick={logout}>
                        <Logout className='text-black ' />  Logout
                      </Button>
                    }
                  </Stack>
                </Box>
              )}
            </div>
            :
            <Button variant='outlined' sx={{display:{sm:'flex',xs:'none'}}}>
              <Link to='/login' style={{textDecoration:'none',color:'black'}}>Login</Link>
            </Button>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;