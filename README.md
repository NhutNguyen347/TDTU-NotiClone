# 💌 TDTU Notification Center Clone 💌
## 🧑‍🤝‍🧑 DT-Squad Pre-make 

<!-- [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) -->

<!-- A standard style for README files -->

*Good morning to everyone* 🌅, especially morning heads out there who do wake up in the morning and code and work and solve problems... I am here to introduce to you all, a simple full-stack social network site based on TDTU Notification Center site.

This repository contains:

1. Client side source code
2. Server side source code
3. Original template source code (*Coming soon*)
4. README.md for instruction
<!-- 5. [Examples of standard READMEs](example-readmes/) - such as this file you are reading. -->

<!-- Standard Readme is designed for open source libraries. Although it’s [historically](#background) made for Node and npm projects, it also applies to libraries in other languages and package managers. -->


## 🍱 Table of Contents 🍱

- [Background](#background)
- [How to install?](#install)
- [Usage](#usage)
	- [Generator](#generator)
- [Badge](#badge)
- [Example Readmes](#example-readmes)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Background

Standard Readme started with the issue originally posed by [@maxogden](https://github.com/maxogden) over at [feross/standard](https://github.com/feross/standard) in [this issue](https://github.com/feross/standard/issues/141), about whether or not a tool to standardize readmes would be useful. A lot of that discussion ended up in [zcei's standard-readme](https://github.com/zcei/standard-readme/issues/1) repository. While working on maintaining the [IPFS](https://github.com/ipfs) repositories, I needed a way to standardize Readmes across that organization. This specification started as a result of that.

> Your documentation is complete when someone can use your module without ever
having to look at its code. This is very important. This makes it possible for
you to separate your module's documented interface from its internal
implementation (guts). This is good because it means that you are free to
change the module's internals as long as the interface remains the same.

> Remember: the documentation, not the code, defines what a module does.

~ [Ken Williams, Perl Hackers](http://mathforum.org/ken/perl_modules.html#document)

Writing READMEs is way too hard, and keeping them maintained is difficult. By offloading this process - making writing easier, making editing easier, making it clear whether or not an edit is up to spec or not - you can spend less time worrying about whether or not your initial documentation is good, and spend more time writing and using code.

By having a standard, users can spend less time searching for the information they want. They can also build tools to gather search terms from descriptions, to automatically run example code, to check licensing, and so on.

The goals for this repository are:

1. A well defined **specification**. This can be found in the [Spec document](spec.md). It is a constant work in progress; please open issues to discuss changes.
2. **An example README**. This Readme is fully standard-readme compliant, and there are more examples in the `example-readmes` folder.
3. A **linter** that can be used to look at errors in a given Readme. Please refer to the [tracking issue](https://github.com/RichardLitt/standard-readme/issues/5).
4. A **generator** that can be used to quickly scaffold out new READMEs. See [generator-standard-readme](https://github.com/RichardLitt/generator-standard-readme).
5. A **compliant badge** for users. See [the badge](#badge).

## 🔠 Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed. Then you need to go to the root folder and install all the required modules in the project by using the bash below

```sh
$ npm install
```

## Usage

<!-- This is only a documentation package. You can print out [spec.md](spec.md) to your console: -->
I did customize that `npm start` so ahead and do this in root folder and the application will run straight the way at port 3000.

```sh
npm start
```

### Generator

To use the generator, look at [generator-standard-readme](https://github.com/RichardLitt/generator-standard-readme). There is a global executable to run the generator in that package, aliased as `standard-readme`.

## Badge

If your README is compliant with Standard-Readme and you're on GitHub, it would be great if you could add the badge. This allows people to link back to this Spec, and helps adoption of the README. The badge is **not required**.

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

To add in Markdown format, use this code:

```
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
```

## Example Readmes

To see how the specification has been applied, see the [example-readmes](example-readmes/).

## Related Efforts

- [Art of Readme](https://github.com/noffle/art-of-readme) - 💌 Learn the art of writing quality READMEs.
- [open-source-template](https://github.com/davidbgk/open-source-template/) - A README template to encourage open-source contributions.

## Maintainers

[@NhutNguyen236](https://github.com/NhutNguyen236).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/NhutNguyen347/TDTU-NotiClone/issues) or submit PRs.

<!-- Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct. -->

### Contributors

This project exists thanks to all the people who contribute. 

<table>
  	<tr>
        <td align="center">
            <a href="https://github.com/BrandonTuan777"><img src="https://github.com/BrandonTuan777.png" width="100px;" alt=""/><br/>
            <sub><b>Morisaki Tuan</b></sub></a><br /><a href="#question-kentcdodds" title="Answering Questions">💬</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#talk-kentcdodds" title="Talks">📢</a>
        </td>
            <td align="center"><a href="https://github.com/NhutNguyen236"><img src="https://github.com/NhutNguyen236.png" width="100px;" alt=""/><br/>
            <sub><b>Nhut Nguyen</b></sub></a><br /><a href="#question-kentcdodds" title="Answering Questions">💬</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=kentcdodds" title="Documentation">📖</a> <a href="https://github.com/all-contributors/all-contributors/pulls?q=is%3Apr+reviewed-by%3Akentcdodds" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=MatheusRV" title="Code">💻</a> <a href="#maintenance-tbenning" title="Maintenance">🚧</a> 
        </td>
	</tr>
</table>

## License

[MIT](LICENSE) © Nhut & Brandon
