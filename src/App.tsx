import React, { useState } from "react";

import { WebBundlr } from "@bundlr-network/client";
import BigNumber from "bignumber.js";
import { Button } from "@chakra-ui/button";
import {
  Input,
  HStack,
  Text,
  VStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Textarea,
  Divider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { CopyToClipboard } from 'react-copy-to-clipboard';

declare var window: any; // TODO: specifically extend type to valid injected objects.

function App() {
  const defaultCurrency = "Select a Currency";
  const defaultSelection = "Select a Provider";
  const [currency, setCurrency] = React.useState<string>(defaultCurrency);
  const [address, setAddress] = React.useState<string>();
  const [selection, setSelection] = React.useState<string>(defaultSelection);
  const [balance, setBalance] = React.useState<string>();
  const [img, setImg] = React.useState<Buffer>();
  const [price, setPrice] = React.useState<BigNumber>();
  const [bundler, setBundler] = React.useState<WebBundlr>();
  const [bundlerHttpAddress, setBundlerAddress] = React.useState<string>(
    "https://node1.bundlr.network"
  );
  const [fundAmount, setFundingAmount] = React.useState<string>();
  const [withdrawAmount, setWithdrawAmount] = React.useState<string>();
  const [provider, setProvider] = React.useState<Web3Provider>();

  const toast = useToast();
  const intervalRef = React.useRef<number>();

  const [tagValue, setTagValue] = React.useState<string>("image/png");
  const [tagValueOfTxt, setTagValueOfTxt] =
    React.useState<string>("application/elixir");

  // var lastTxId: string = "";
  const [lastTxId, setLastTxId] = useState("");
  const [txt, setTxt] = React.useState<string>("just a piece of word");
  const [txtPrice, setTxtPrice] = React.useState<BigNumber>();

  const clean = async () => {
    clearInterval(intervalRef.current);
    setBalance(undefined);
    setImg(undefined);
    setPrice(undefined);
    setBundler(undefined);
    setProvider(undefined);
    setAddress(undefined);
    setCurrency(defaultCurrency);
    setSelection(defaultSelection);
  };

  const handleFileClick = () => {
    var fileInputEl = document.createElement("input");
    fileInputEl.type = "file";
    fileInputEl.accept = "image/*";
    fileInputEl.style.display = "none";
    document.body.appendChild(fileInputEl);
    fileInputEl.addEventListener("input", function (e) {
      handleUpload(e as any);
      document.body.removeChild(fileInputEl);
    });
    fileInputEl.click();
  };

  const handleUpload = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    let files = evt.target.files;
    let reader = new FileReader();
    if (files && files.length > 0) {
      reader.onload = function () {
        if (reader.result) {
          setImg(Buffer.from(reader.result as ArrayBuffer));
        }
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };

  const handlePrice = async () => {
    if (img) {
      const price = await bundler?.utils.getPrice(
        currency as string,
        img.length
      );
      //@ts-ignore
      setPrice(price?.toString());
    }
  };

  const handleTxtPrice = async () => {
    if (txt) {
      const price = await bundler?.utils.getPrice(
        currency as string,
        Buffer.from(txt, "utf8").length
      );
      //@ts-ignore
      setTxtPrice(price?.toString());
    }
  };

  const uploadFile = async () => {
    if (img) {
      await bundler?.uploader
        .upload(img, [{ name: "Content-Type", value: tagValue }])
        .then(res => {
          toast({
            status:
              res?.status === 200 || res?.status === 201 ? "success" : "error",
            title:
              res?.status === 200 || res?.status === 201
                ? "Successful!"
                : `Unsuccessful! ${res?.status}`,
            description: res?.data.id
              ? `https://arweave.net/${res.data.id}`
              : undefined,
            duration: 15000,
          });
          window.lastTxId = res.data.id;
          setLastTxId(res.data.id);
          console.log("uploaded tx id is " + window.lastTxId);
        })
        .catch(e => {
          toast({ status: "error", title: `Failed to upload - ${e}` });
        });
    }
  };

  // add by @leeduckgo
  const copyJson = async() => {

  }

  // add by @leeduckgo
  const uploadTxt = async () => {
    if (txt) {
      await bundler?.uploader
        .upload(Buffer.from(txt, "utf8"), [
          { name: "Content-Type", value: tagValueOfTxt },
        ]) // transfer txt to buffer.
        .then(res => {
          toast({
            status:
              res?.status === 200 || res?.status === 201 ? "success" : "error",
            title:
              res?.status === 200 || res?.status === 201
                ? "Successful!"
                : `Unsuccessful! ${res?.status}`,
            description: res?.data.id
              ? `https://arweave.net/${res.data.id}`
              : undefined,
            duration: 15000,
          });
          window.lastTxId = res.data.id;
          setLastTxId(res.data.id);
          console.log("uploaded tx id is " + window.lastTxId);
        })
        .catch(e => {
          toast({ status: "error", title: `Failed to upload - ${e}` });
        });
    }
  };

  const fund = async () => {
    if (bundler && fundAmount) {
      toast({ status: "info", title: "Funding...", duration: 15000 });
      const value = parseInput(fundAmount);
      if (!value) return;
      await bundler
        .fund(value)
        .then(res => {
          toast({
            status: "success",
            title: `Funded ${res?.target}`,
            description: ` tx ID : ${res?.id}`,
            duration: 10000,
          });
        })
        .catch(e => {
          toast({
            status: "error",
            title: `Failed to fund - ${e.data?.message || e.message}`,
          });
        });
    }
  };

  const withdraw = async () => {
    if (bundler && withdrawAmount) {
      toast({ status: "info", title: "Withdrawing..", duration: 15000 });
      const value = parseInput(withdrawAmount);
      if (!value) return;
      await bundler
        .withdrawBalance(value)
        .then(data => {
          toast({
            status: "success",
            title: `Withdrawal successful - ${data.data?.tx_id}`,
            duration: 5000,
          });
        })
        .catch((err: any) => {
          toast({
            status: "error",
            title: "Withdrawal Unsuccessful!",
            description: err.message,
            duration: 5000,
          });
        });
    }
  };

  // field change event handlers

  const updateAddress = (evt: React.BaseSyntheticEvent) => {
    setBundlerAddress(evt.target.value);
  };

  const updateFundAmount = (evt: React.BaseSyntheticEvent) => {
    setFundingAmount(evt.target.value);
  };

  const updateWithdrawAmount = (evt: React.BaseSyntheticEvent) => {
    setWithdrawAmount(evt.target.value);
  };

  // upload here.
  const updateTxt = (evt: React.BaseSyntheticEvent) => {
    setTxt(evt.target.value);
  };

  const connectWeb3 = async (connector: any) => {
    if (provider) {
      await clean();
    }
    const p = new providers.Web3Provider(connector);
    await p._ready();
    return p;
  };

  /**
   * Map of providers with initialisation code - c is the configuration object from currencyMap
   */
  const providerMap = {
    MetaMask: async (c: any) => {
      if (!window?.ethereum?.isMetaMask) return;
      await window.ethereum.enable();
      const provider = await connectWeb3(window.ethereum);
      const chainId = `0x${c.chainId.toString(16)}`;
      try {
        // additional logic for requesting a chain switch and conditional chain add.
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (e: any) {
        if (e.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId,
                rpcUrls: c.rpcUrls,
                chainName: c.chainName,
              },
            ],
          });
        }
      }
      return provider;
    },
    WalletConnect: async (c: any) => {
      return await connectWeb3(await new WalletConnectProvider(c).enable());
    },
  } as any;

  const ethProviders = ["MetaMask", "WalletConnect"];

  const currencyMap = {
    matic: {
      providers: ethProviders,
      opts: {
        chainId: 137,
        chainName: "Polygon Mainnet",
        rpcUrls: ["https://polygon-rpc.com"],
      },
    },
  } as any;

  /**
   * initialises the selected provider/currency
   * @param cname currency name
   * @param pname provider name
   * @returns
   */
  const initProvider = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (provider) {
      setProvider(undefined);
      setBundler(undefined);
      setAddress(undefined);
      return;
    }

    const pname = selection as string;
    const cname = currency as string;
    const p = providerMap[pname]; // get provider entry
    const c = currencyMap[cname];
    console.log(`loading: ${pname} for ${cname}`);
    const providerInstance = await p(c.opts).catch((e: Error) => {
      toast({
        status: "error",
        title: `Failed to load provider ${pname}`,
        duration: 10000,
      });
      console.log(e);
      return;
    });
    setProvider(providerInstance);
  };

  const initBundlr = async () => {
    const bundlr = new WebBundlr(bundlerHttpAddress, currency, provider);
    try {
      // Check for valid bundlr node
      await bundlr.utils.getBundlerAddress(currency);
    } catch {
      toast({
        status: "error",
        title: `Failed to connect to bundlr ${bundlerHttpAddress}`,
        duration: 10000,
      });
      return;
    }
    try {
      await bundlr.ready();
    } catch (err) {
      console.log(err);
    } //@ts-ignore
    if (!bundlr.address) {
      console.log("something went wrong");
    }
    toast({ status: "success", title: `Connected to ${bundlerHttpAddress}` });
    setAddress(bundlr?.address);
    setBundler(bundlr);
  };

  const toProperCase = (s: string) => {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
  };
  const toggleRefresh = async () => {
    if (intervalRef) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(async () => {
      bundler
        ?.getLoadedBalance()
        .then(r => {
          setBalance(r.toString());
        })
        .catch(_ => clearInterval(intervalRef.current));
    }, 5000);
  };

  // parse decimal input into atomic units
  const parseInput = (input: string | number) => {
    const conv = new BigNumber(input).multipliedBy(
      bundler!.currencyConfig.base[1]
    );
    if (conv.isLessThan(1)) {
      toast({ status: "error", title: `Value too small!` });
      return;
    }
    return conv;
  };

  return (
    <VStack mt={10}>
      <HStack>
        {" "}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {toProperCase(currency)}
          </MenuButton>
          <MenuList>
            {Object.keys(currencyMap).map(v => {
              return (
                <MenuItem
                  key={v}
                  onClick={() => {
                    clean();
                    setCurrency(v);
                  }}
                >
                  {toProperCase(v)}
                </MenuItem>
              ); // proper/title case
            })}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            disabled={currency === defaultCurrency}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {selection}
          </MenuButton>
          <MenuList>
            {Object.keys(providerMap).map(v => {
              return currencyMap[currency] &&
                currencyMap[currency].providers.indexOf(v) !== -1 ? (
                <MenuItem key={v} onClick={() => setSelection(v)}>
                  {v}
                </MenuItem>
              ) : undefined;
            })}
          </MenuList>
        </Menu>
        <Button
          w={300}
          colorScheme="green"
          disabled={
            !(
              selection !== defaultSelection &&
              currency !== defaultCurrency &&
              bundlerHttpAddress.length > 8
            )
          }
          onClick={async () => await initProvider()}
        >
          {provider ? "Disconnect" : "Connect"}
        </Button>
      </HStack>
      <Text>Connected Account: {address ?? "None"}</Text>
      <HStack w={1000}>
        <Button
          w={300}
          colorScheme="green"
          disabled={!provider}
          onClick={async () => await initBundlr()}
        >
          Connect to Bundlr
        </Button>
        <Input
          value={bundlerHttpAddress}
          onChange={updateAddress}
          placeholder="Bundler Address"
        />
        {bundler && (
          <>
            <Button
              w={300}
              onClick={async () => {
                address &&
                  bundler!.getBalance(address).then((res: BigNumber) => {
                    setBalance(res.toString());
                  });
                await toggleRefresh();
              }}
            >
              Get Balance
            </Button>
            {balance && (
              <Tooltip label={`(${balance} ${bundler.currencyConfig.base[0]})`}>
                <Text style={{ whiteSpace: "nowrap" }}>
                  {bundler.utils
                    .unitConverter(balance)
                    .toFixed(4, 2)
                    .toString()}{" "}
                  {bundler.currencyConfig.ticker.toLowerCase()}
                </Text>
              </Tooltip>
            )}
          </>
        )}
      </HStack>
      {bundler && (
        <>
          <HStack w={1000}>
            <Button w={300} onClick={fund}>
              Fund
            </Button>
            <Input
              placeholder={`${toProperCase(currency)} Amount`}
              value={fundAmount}
              onChange={updateFundAmount}
            />
            <Button w={300} onClick={withdraw}>
              Withdraw
            </Button>
            <Input
              placeholder={`${toProperCase(currency)} Amount`}
              value={withdrawAmount}
              onChange={updateWithdrawAmount}
            />
          </HStack>

          <Divider w={1000} />
          <Text fontSize="xl">Choice 0x01. Upload File</Text>

          <HStack>
            <Text>Type(default is "image/png"):</Text>
            <Input
              onChange={event => setTagValue(event.target.value)}
              placeholder="image/png"
            />
          </HStack>

          <Button w={300} onClick={handleFileClick}>
            Select file from Device
          </Button>
          {img && (
            <>
              <HStack>
                <Button w={300} onClick={handlePrice}>
                  Get Price
                </Button>
                {price && (
                  <Text>{`Cost: ${bundler.utils
                    .unitConverter(price)
                    .toString()} ${bundler.currencyConfig.ticker.toLowerCase()} `}</Text>
                )}
              </HStack>
              <Button w={300} onClick={uploadFile}>
                Upload File to Bundlr Network
              </Button>
            </>
          )}

          <Divider w={1000} />
          <Text fontSize="xl">Choice 0x02. Upload Code or Any Other Txt</Text>

          <HStack>
            <Textarea
              onChange={updateTxt}
              style={{ minHeight: "300px", marginTop: "5px", width: "500px" }}
            ></Textarea>
          </HStack>
          <HStack>
            <Text>Type(default is "application/elixir"):</Text>
            <Input
              onChange={event => setTagValueOfTxt(event.target.value)}
              placeholder="application/elixir"
            />
          </HStack>

          <HStack
            w={1000}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button w={300} onClick={handleTxtPrice}>
              Get Price
            </Button>
            {txtPrice && (
              <Text>
                {`Cost: ${bundler.utils
                  .unitConverter(txtPrice)
                  .toString()} ${bundler.currencyConfig.ticker.toLowerCase()} `}
              </Text>
            )}
          </HStack>
          <Button w={300} onClick={uploadTxt}>
            Upload Text to Bundlr Network
          </Button>

          <CopyToClipboard text={`{ "address": "${address}", "tx_hash": "${lastTxId}", "copy_from": "bundlr" }`}>
            <Button width='300px'>Copy to clipboard with button</Button>
          </CopyToClipboard>
          
        </>
      )}
    </VStack>
  );
}

export default App;
