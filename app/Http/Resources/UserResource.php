<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
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
            'email' => $this->email,
            'created_tasks_count' => $this->created_tasks_count,
            'assigned_tasks_count' => $this->assigned_tasks_count,
            'created_projects_count' => $this->created_projects_count,
            // 'created_at' => (new Carbon($this->created_at))->format('d-m-Y'),
            // 'updated_at' => (new Carbon($this->updated_at))->format('d-m-Y'),
        ];
    }
}
