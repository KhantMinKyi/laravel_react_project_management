<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $projects = Project::all()->paginate(10)->onEachPage(1);
        $query = Project::query();
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $projects = $query->withCount('tasks')->orderBy($sortField, $sortDirection)->paginate(10);
        // return $projects;
        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::user()->id;
        $data['updated_by'] = Auth::user()->id;
        // dd($data);
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('project-' . Str::random(), 'public');
        }
        $project = Project::create($data);
        return to_route('projects.index')->with('success', 'Project was created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // dd($project);
        $query = $project->tasks();
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('priority')) {
            $query->where('priority', request('priority'));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        // dd($tasks);
        return inertia("Project/Detail", [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
