<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Right
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $activation
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Staff[] $staff
 * @property-read int|null $staff_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereActivation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Right whereUpdatedAt($value)
 */
	class Right extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Role
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string|null $activation
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Right[] $rights
 * @property-read int|null $rights_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Staff[] $staff
 * @property-read int|null $staff_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereActivation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Staff
 *
 * @property int $id
 * @property string $personnel_id
 * @property string $username
 * @property string $firstname
 * @property string $nickname
 * @property string $lastname
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property int $verification_status
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Right[] $rights
 * @property-read int|null $rights_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereFirstname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereLastname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff wherePersonnelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Staff whereVerificationStatus($value)
 */
	class Staff extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\VisitorMessage
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $sender
 * @property string|null $message
 * @property string $contact
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage whereContact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage whereSender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VisitorMessage whereUpdatedAt($value)
 */
	class VisitorMessage extends \Eloquent {}
}

