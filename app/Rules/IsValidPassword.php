<?php

namespace App\Rules;

use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\Rule;

class IsValidPassword implements Rule
{
    /**
     * Determine if the Length Validation Rule passes.
     *
     * @var boolean
     */
    public $lengthPasses = true;

    /**
     * Determine if the Uppercase Validation Rule passes.
     *
     * @var boolean
     */
    public $uppercasePasses = true;

    /**
     * Determine if the Numeric Validation Rule passes.
     *
     * @var boolean
     */
    public $numericPasses = true;

    /**
     * Determine if the Special Character Validation Rule passes.
     *
     * @var boolean
     */
    public $specialCharacterPasses = true;

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $this->lengthPasses = (Str::length($value) >= 6);
        $this->uppercasePasses = (Str::lower($value) !== $value);
        $this->numericPasses = ((bool) preg_match('/[0-9]/', $value));
        $this->specialCharacterPasses = ((bool) preg_match('/[^A-Za-z0-9]/', $value));

        return ($this->lengthPasses && $this->uppercasePasses && $this->numericPasses && $this->specialCharacterPasses);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        switch (true) {
            case !$this->uppercasePasses
                && $this->numericPasses
                && $this->specialCharacterPasses:
                return '1 huruf besar.';

            case !$this->numericPasses
                && $this->uppercasePasses
                && $this->specialCharacterPasses:
                return '1 nomor.';

            case !$this->specialCharacterPasses
                && $this->uppercasePasses
                && $this->numericPasses:
                return '1 karakter unik, cth: (!@#$%^&*)';

            case !$this->uppercasePasses
                && !$this->numericPasses
                && $this->specialCharacterPasses:
                return '1 huruf besar dan 1 nomor.';

            case !$this->uppercasePasses
                && !$this->specialCharacterPasses
                && $this->numericPasses:
                return '1 huruf besar dan 1 karakter unik, cth: (!@#$%^&*).';

            case !$this->uppercasePasses
                && !$this->numericPasses
                && !$this->specialCharacterPasses:
                return '1 huruf besar, 1 nomor, dan 1 karakter unik, cth: (!@#$%^&*).';

            default:
                return 'Password minimal ada 6 karakter.';
        }
    }
}
