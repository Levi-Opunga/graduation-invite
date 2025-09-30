import { GraduationCap } from "lucide-react"
import { headers } from "next/headers"

export async function LoaderPage({ darkMode = false }: LoaderPageProps) {

    const hds = headers()
    const path = hds.get('referer')?.split("/")
    if (path && path.includes('admin')) {
        darkMode = true
    }

    return (
        <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
            {/* Main loader content */}
            <div className="flex flex-col items-center gap-8">
                {/* Simple spinner */}
                <div className="relative">
                    {/* Single ring */}
                    <div className={`w-20 h-20 rounded-full border-3 animate-spin`}
                        style={{
                            animationDuration: '1s',
                            borderWidth: '3px',
                            borderColor: darkMode ? '#334155' : '#e2e8f0',
                            borderTopColor: '#1a2f4a'
                        }} />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <GraduationCap className="w-8 h-8" style={{ color: '#1a2f4a' }} />
                    </div>
                </div>

                {/* Loading text */}
                <div className="text-center">
                    <p className={`text-lg font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Loading...</p>
                </div>
            </div>
        </div>
    )
}