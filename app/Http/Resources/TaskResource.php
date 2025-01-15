<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->image_path,
            'status' => $this->status,
            'priority' => $this->priority,
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'assignedBy' => new UserResource($this->assignedBy),
            'assignedTo' => new UserResource($this->assignedTo),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'project' => new ProjectResource($this->project),
            'is_active' => $this->is_active,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            // 'tasks_count' => $this->tasks_count
        ];
    }
}
