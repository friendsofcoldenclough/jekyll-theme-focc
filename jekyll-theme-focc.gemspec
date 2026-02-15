# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-focc"
  spec.version       = "0.0.1"
  spec.authors       = ["Peter Edwards"]
  spec.email         = ["pete@bjorsq.net"]

  spec.summary       = "Jekyll theme for Friends of Colden Clough organisation"
  spec.homepage      = "https://friendsofcoldenclough.org.uk/jekyll-theme-focc/"
  spec.license       = "Unlicense"

  spec.files         = `git ls-files -z`.split("\x0")

  spec.metadata = {
    "bug_tracker_uri"   => "https://github.com/friendsofcoldenclough/jekyll-theme-focc/issues",
    "changelog_uri"     => "https://github.com/friendsofcoldenclough/jekyll-theme-focc/README.md",
    "documentation_uri" => "https://github.com/friendsofcoldenclough/jekyll-theme-focc/wiki",
    "homepage_uri"      => "https://friendsofcoldenclough.org.uk/jekyll-theme-focc/",
    "mailing_list_uri"  => "",
    "source_code_uri"   => "https://github.com/friendsofcoldenclough/jekyll-theme-focc",
    "wiki_uri"          => "https://github.com/friendsofcoldenclough/jekyll-theme-focc/wiki"
  }
  spec.add_runtime_dependency "jekyll", "~> 3.10", ">= 3.10.0"

end
