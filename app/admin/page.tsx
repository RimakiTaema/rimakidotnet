"use client"

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { SidebarSeparator } from "@/components/ui/sidebar";
import type { Project, Category } from "@/db";
import gsap from "gsap";

function adminFetch(path: string, key: string, options?: RequestInit) {
    return fetch(path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "x-admin-key": key,
            ...options?.headers,
        },
    });
}

export default function AdminPage() {
    const [adminKey, setAdminKey] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
    const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
    const [error, setError] = useState("");
    const pageRef = useRef<HTMLDivElement>(null);

    const loadData = async (key: string) => {
        const [projRes, catRes] = await Promise.all([
            fetch("/api/projects"),
            fetch("/api/categories"),
        ]);
        setProjects(await projRes.json());
        setCategories(await catRes.json());
    };

    const handleLogin = async () => {
        const res = await adminFetch("/api/projects", adminKey);
        if (res.ok) {
            setAuthenticated(true);
            setError("");
            sessionStorage.setItem("admin-key", adminKey);
            await loadData(adminKey);
        } else {
            setError("Invalid key");
        }
    };

    useEffect(() => {
        const saved = sessionStorage.getItem("admin-key");
        if (saved) {
            setAdminKey(saved);
            setAuthenticated(true);
            loadData(saved);
        }
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(pageRef.current, {
                opacity: 0, y: 12, duration: 0.4, ease: "power2.out",
            });
        });
        return () => ctx.revert();
    }, []);

    const saveProject = async () => {
        if (!editingProject) return;
        const isEdit = editingProject.id !== undefined;
        const tagsValue = typeof editingProject.tags === "string"
            ? (editingProject.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean)
            : editingProject.tags;

        const res = await adminFetch("/api/admin/projects", adminKey, {
            method: isEdit ? "PUT" : "POST",
            body: JSON.stringify({ ...editingProject, tags: tagsValue }),
        });

        if (res.ok) {
            setEditingProject(null);
            await loadData(adminKey);
        } else {
            const data = (await res.json()) as { error?: string };
            setError(data.error || "Failed to save");
        }
    };

    const deleteProject = async (id: number) => {
        if (!confirm("Delete this project?")) return;
        await adminFetch("/api/admin/projects", adminKey, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        await loadData(adminKey);
    };

    const saveCategory = async () => {
        if (!editingCategory) return;
        const isEdit = editingCategory.id !== undefined;
        const res = await adminFetch("/api/admin/categories", adminKey, {
            method: isEdit ? "PUT" : "POST",
            body: JSON.stringify(editingCategory),
        });

        if (res.ok) {
            setEditingCategory(null);
            await loadData(adminKey);
        } else {
            const data = (await res.json()) as { error?: string };
            setError(data.error || "Failed to save");
        }
    };

    const deleteCategory = async (id: number) => {
        if (!confirm("Delete this category?")) return;
        await adminFetch("/api/admin/categories", adminKey, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        await loadData(adminKey);
    };

    if (!authenticated) {
        return (
            <div ref={pageRef} className="min-h-screen bg-zinc-50 dark:bg-black p-8 flex items-center justify-center">
                <Card className="w-80 p-6">
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-4">Admin Login</CardTitle>
                    <input
                        type="password"
                        placeholder="Admin key"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-3"
                    />
                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                    <Button onClick={handleLogin} className="w-full cursor-pointer">
                        Login
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div ref={pageRef} className="min-h-screen bg-zinc-50 dark:bg-black p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Admin</h1>
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                            sessionStorage.removeItem("admin-key");
                            setAuthenticated(false);
                            setAdminKey("");
                        }}
                    >
                        Logout
                    </Button>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                {/* Projects */}
                <h2 className="text-xl font-semibold mt-8">Projects</h2>
                <SidebarSeparator />
                <div className="mt-4 space-y-3">
                    {projects.map((p) => (
                        <Card key={p.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-900">{p.title}</p>
                                <p className="text-sm text-gray-500">{p.slug} — {p.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => setEditingProject({
                                        ...p,
                                        tags: p.tags ? JSON.parse(p.tags).join(", ") : "",
                                    })}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => deleteProject(p.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
                <Button
                    className="mt-3 cursor-pointer"
                    onClick={() => setEditingProject({ title: "", description: "", slug: "", tags: "", categorySlug: "", href: "", hasMdx: false })}
                >
                    Add Project
                </Button>

                {/* Project Form */}
                {editingProject && (
                    <Card className="mt-4 p-4 space-y-3">
                        <CardTitle className="text-lg text-gray-900">
                            {editingProject.id ? "Edit" : "New"} Project
                        </CardTitle>
                        <input
                            placeholder="Title"
                            value={editingProject.title ?? ""}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Slug (url-friendly)"
                            value={editingProject.slug ?? ""}
                            onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Description"
                            value={editingProject.description ?? ""}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Tags (comma separated)"
                            value={(editingProject.tags as string) ?? ""}
                            onChange={(e) => setEditingProject({ ...editingProject, tags: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <select
                            value={editingProject.categorySlug ?? ""}
                            onChange={(e) => setEditingProject({ ...editingProject, categorySlug: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                            <option value="">No category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.slug}>{c.title}</option>
                            ))}
                        </select>
                        <input
                            placeholder="External link (optional)"
                            value={editingProject.href ?? ""}
                            onChange={(e) => setEditingProject({ ...editingProject, href: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={editingProject.hasMdx ?? false}
                                onChange={(e) => setEditingProject({ ...editingProject, hasMdx: e.target.checked })}
                            />
                            Has MDX detail page
                        </label>
                        <div className="flex gap-2">
                            <Button onClick={saveProject} className="cursor-pointer">Save</Button>
                            <Button variant="outline" onClick={() => setEditingProject(null)} className="cursor-pointer">
                                Cancel
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Categories */}
                <h2 className="text-xl font-semibold mt-8">Categories</h2>
                <SidebarSeparator />
                <div className="mt-4 space-y-3">
                    {categories.map((c) => (
                        <Card key={c.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-900">{c.title}</p>
                                <p className="text-sm text-gray-500">{c.slug} — {c.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => setEditingCategory({ ...c })}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="cursor-pointer"
                                    onClick={() => deleteCategory(c.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
                <Button
                    className="mt-3 cursor-pointer"
                    onClick={() => setEditingCategory({ title: "", description: "", slug: "" })}
                >
                    Add Category
                </Button>

                {/* Category Form */}
                {editingCategory && (
                    <Card className="mt-4 p-4 space-y-3">
                        <CardTitle className="text-lg text-gray-900">
                            {editingCategory.id ? "Edit" : "New"} Category
                        </CardTitle>
                        <input
                            placeholder="Title"
                            value={editingCategory.title ?? ""}
                            onChange={(e) => setEditingCategory({ ...editingCategory, title: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Slug (url-friendly)"
                            value={editingCategory.slug ?? ""}
                            onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <input
                            placeholder="Description"
                            value={editingCategory.description ?? ""}
                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <div className="flex gap-2">
                            <Button onClick={saveCategory} className="cursor-pointer">Save</Button>
                            <Button variant="outline" onClick={() => setEditingCategory(null)} className="cursor-pointer">
                                Cancel
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
