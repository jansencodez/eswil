@echo off
:: Create project root directories
mkdir app
mkdir components
mkdir assets
mkdir styles
mkdir utils
mkdir hooks
mkdir context

:: Create app folder structure
mkdir app\(admin)
mkdir app\(student)
mkdir app\(teacher)
type NUL > app\page.js

:: Create components folder structure
mkdir components\Admin
mkdir components\Student
mkdir components\Teacher
mkdir components\Common

:: Create assets folder structure
mkdir assets\images
mkdir assets\icons
mkdir assets\fonts

:: Create styles folder structure and files
type NUL > styles\globals.css
type NUL > styles\variables.css
type NUL > styles\AdminStyles.css

:: Create utils folder structure and files
type NUL > utils\auth.js
type NUL > utils\fetchWithToken.js
type NUL > utils\dateUtils.js

:: Create hooks folder and file
type NUL > hooks\useAuth.js

:: Create context folder and files
type NUL > context\ThemeContext.js
type NUL > context\AuthContext.js

:: Create root files
type NUL > middleware.js

echo Folder structure created successfully!
