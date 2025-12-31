<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add username column as nullable first
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->after('name');
            $table->string('email')->nullable()->change();
        });

        // Update existing users to have username based on their email
        DB::table('users')->update([
            'username' => DB::raw('email')
        ]);

        // Now make username unique and not nullable
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('username');
            $table->string('email')->nullable(false)->change();
        });
    }
};
