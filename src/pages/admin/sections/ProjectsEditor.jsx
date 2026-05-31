import { useState, useEffect } from "react";
import { supabase } from "../../../supabaseClient";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

const ProjectsEditor = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (!error) setProjects(data);
    else toast.error("Failed to fetch projects");
    setLoading(false);
  };

  const handleOpenModal = (project = null) => {
    setCurrentProject(
      project || {
        project_name: "",
        jenis_project: "",
        status: "proses",
        deskripsi: "",
        image_url: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from("projects").upload(filePath, file);

    if (uploadError) {
      toast.error("Upload failed: " + uploadError.message);
    } else {
      setCurrentProject((prev) => ({ ...prev, image_url: filePath }));
      toast.success("Image uploaded!");
    }
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (currentProject.id) {
        // Update
        const { error } = await supabase
          .from("projects")
          .update(currentProject)
          .eq("id", currentProject.id);
        if (error) throw error;
        toast.success("Project updated!");
      } else {
        // Insert
        const { error } = await supabase.from("projects").insert([currentProject]);
        if (error) throw error;
        toast.success("Project created!");
      }
      fetchProjects();
      handleCloseModal();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      toast.success("Project deleted!");
      fetchProjects();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects Manager</h1>
          <p className="text-white/30 text-sm mt-1">Add, edit, or remove portfolio projects</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 active:scale-95 transition-all"
        >
          <Icon icon="solar:add-circle-bold" className="text-lg" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group">
              <div className="h-40 bg-white/5 relative">
                {proj.image_url ? (
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/${proj.image_url}`}
                    alt={proj.project_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/20">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                  <button onClick={() => handleOpenModal(proj)} className="p-2 bg-white text-black rounded-lg hover:scale-105">
                    <Icon icon="solar:pen-bold" />
                  </button>
                  <button onClick={() => handleDelete(proj.id)} className="p-2 bg-red-500 text-white rounded-lg hover:scale-105">
                    <Icon icon="solar:trash-bin-trash-bold" />
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white truncate pr-4">{proj.project_name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border whitespace-nowrap ${
                    proj.status === "selesai" ? "border-green-500/50 text-green-500" : "border-yellow-500/50 text-yellow-500"
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <p className="text-white/40 text-xs truncate uppercase tracking-wider mb-3">{proj.jenis_project}</p>
                <p className="text-white/50 text-sm line-clamp-2">{proj.deskripsi}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#0a0a0a] z-10">
              <h2 className="text-xl font-bold text-white">{currentProject.id ? "Edit Project" : "New Project"}</h2>
              <button onClick={handleCloseModal} className="text-white/50 hover:text-white">
                <Icon icon="solar:close-circle-bold" className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Project Name</label>
                  <input
                    type="text"
                    required
                    value={currentProject.project_name}
                    onChange={(e) => setCurrentProject({ ...currentProject, project_name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Category / Type</label>
                  <input
                    type="text"
                    required
                    value={currentProject.jenis_project}
                    onChange={(e) => setCurrentProject({ ...currentProject, jenis_project: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30">Status</label>
                <select
                  value={currentProject.status}
                  onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm [&>option]:bg-[#0a0a0a]"
                >
                  <option value="proses">Proses</option>
                  <option value="selesai">Selesai</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30">Description</label>
                <textarea
                  required
                  rows={4}
                  value={currentProject.deskripsi}
                  onChange={(e) => setCurrentProject({ ...currentProject, deskripsi: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/30">Image Upload</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="w-full border-2 border-dashed border-white/10 hover:border-white/30 rounded-xl px-4 py-8 flex flex-col items-center justify-center gap-2 transition-colors">
                      <Icon icon="solar:upload-minimalistic-bold" className="text-2xl text-white/40" />
                      <span className="text-sm text-white/40 font-medium">Click to upload image</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {currentProject.image_url && (
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                      <img
                        src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/projects/${currentProject.image_url}`}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {uploading && <p className="text-xs text-accent animate-pulse mt-2">Uploading image...</p>}
              </div>

              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-[#0a0a0a]">
                <button type="button" onClick={handleCloseModal} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white/70 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploading} className="px-6 py-2.5 bg-white text-black rounded-xl font-bold text-sm hover:bg-white/90 active:scale-95 transition-all disabled:opacity-50">
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsEditor;
