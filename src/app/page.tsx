import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Users,
  FileText,
  Globe,
  Calendar,
  FolderTree,
  Lock,
  Bell,
  Settings,
  Home,
  Search,
  Upload,
  BarChart3,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10">
        {/* Simple Header */}
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-gray-900">
                    Internal CMS
                  </h1>
                  <p className="text-xs text-gray-500">
                    Tim Internal Perusahaan
                  </p>
                </div>
              </div>
              <Link
                href="/login"
                className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Login Anggota Tim</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-2xl mb-6">
                <Home className="w-10 h-10 text-gray-700" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Selamat Datang di{" "}
                <span className="text-black">CMS Internal</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Portal manajemen konten untuk tim internal perusahaan. Gunakan
                untuk berkolaborasi, mengelola, dan mempublikasikan konten
                internal.
              </p>
            </div>

            {/* Quick Access Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Link
                href="/login"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                      Konten & Artikel
                    </h3>
                    <p className="text-sm text-gray-500">
                      Kelola artikel dan dokumen
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                      Tim & Kolaborasi
                    </h3>
                    <p className="text-sm text-gray-500">
                      Kelola anggota dan permissions
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <FolderTree className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                      Kategori & Tag
                    </h3>
                    <p className="text-sm text-gray-500">Organisasi konten</p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-colors">
                    <Upload className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                      Media Library
                    </h3>
                    <p className="text-sm text-gray-500">
                      Upload dan kelola file
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <BarChart3 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                      Analytics
                    </h3>
                    <p className="text-sm text-gray-500">
                      Statistik dan laporan
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/login"
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Settings className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-black">
                      Settings
                    </h3>
                    <p className="text-sm text-gray-500">Konfigurasi sistem</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Features for Internal Team */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-blue-600" />
                Fitur untuk Tim Internal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Akses Terkontrol
                      </h4>
                      <p className="text-sm text-gray-600">
                        Role-based permissions untuk keamanan data internal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Workflow Approval
                      </h4>
                      <p className="text-sm text-gray-600">
                        Sistem approval untuk dokumen internal
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Version Control
                      </h4>
                      <p className="text-sm text-gray-600">
                        Histori perubahan untuk setiap konten
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Internal Sharing
                      </h4>
                      <p className="text-sm text-gray-600">
                        Berbagi konten dengan rekan tim internal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Section */}
            <div className="text-center max-w-md mx-auto">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Akses Terbatas
                </h3>
                <p className="text-gray-600 mb-6">
                  Sistem ini hanya dapat diakses oleh anggota tim internal
                  perusahaan.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Login dengan Akun Internal
                </Link>
                <p className="text-sm text-gray-500">
                  Hubungi admin jika Anda mengalami masalah akses
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">
                    Internal CMS
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  © {new Date().getFullYear()} Tim Internal Perusahaan
                </p>
              </div>
              <div className="text-sm text-gray-600">
                <p>Versi 2.1.0 • Untuk penggunaan internal saja</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
